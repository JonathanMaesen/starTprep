# StarTprep
StarTprep is een project dat voor een AP hogeschool is gemaakt uit passie voor de restaurant industrie.

## Backend

### MongoDB

De database maakt gebruik van MongoDB en bestaat grotendeels uit twee bestanden: `database.ts` en `datausage.ts`. Deze bevinden zich beide in de map `/data`.

**Waarom twee bestanden?**
`database.ts` bevat functies die bovenop de standaard MongoDB-functies zijn gebouwd. Dit maakt het eenvoudiger om extra zaken af te handelen, zoals foutafhandeling zonder telkens een volledige `try/catch`-structuur te moeten schrijven. Bijvoorbeeld:

```ts
export async function insertOneObjMongodb(collectionin: string, obj: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).insertOne(obj);
        return result;
    } catch (e) {
        console.error(e);
    }
}
```

Deze functie verwacht een object en de naam van de collectie. Je hoeft de MongoDB-client dus niet telkens opnieuw aan te maken. Gewoon de juiste parameters doorgeven en klaar.

Ook bevinden zich in deze file functies om de databaseclient aan te maken en af te sluiten:

```ts
function createClient() {
    try {
        const uri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTERURL}/`;
        client = new MongoClient(uri);
        console.log(`Database connected voor gebruiker ${process.env.MONGODBUSERNAME}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
createClient();
```

Als de database niet verbonden kan worden, stopt de server automatisch (`process.exit(1)`), zodat je niet verderwerkt met een server zonder database.

De `uri` wordt opgesplitst via `.env`-variabelen. Dit is overzichtelijker en maakt het makkelijker om meerdere gebruikers/clusters te ondersteunen. Een voorbeeld:

```
MONGODBUSERNAME='Foo'
MONGODBPASSWORD='Bar'
MONGODBCLUSTERURL='startprep.something.mongodb.net'
```

De functie `closeConnection()` sluit de client netjes af. Deze wordt bijvoorbeeld gebruikt in `index.ts` bij het afsluiten van de applicatie, meestal via `SIGINT` of `SIGTERM` (zoals bij `CTRL+C`):

```ts
process.on("SIGINT", async () => {
    console.log("SIGINT ontvangen, afsluiten...");
    await closeConnection();
    process.exit(0);
});
```

### `datausage.ts`

Dit bestand is een soort subset van `database.ts`. Het gebruikt de functies uit `database.ts` om data op te halen, aan te passen of te verwijderen die nodig is in de applicatie (bijvoorbeeld `dishmaster`, `dishes`, `floor`, `ingredients`, ...).

Er zijn vijf soorten functies: `get`, `push`, `delete`, `insert`, `update`.

**Dishmaster** is een uitzondering, want dat is een enkel object in plaats van een lijst. De layout:

```ts
export let dishmaster: {
    categoryMaster: string[];
    proteinTypeMaster: string[];
} = {
    categoryMaster: [],
    proteinTypeMaster: []
};
```

Functies die het vullen:

```ts
async function getCategoryMaster() {
    const data: Categorytype[] = await getAllDataMongoDB("categories");
    dishmaster.categoryMaster = data.map(e => e.nameofcategorie);
}
```

Als een bewerking niet in `datausage.ts` beschikbaar is, kan je altijd terugvallen op `database.ts` of direct op de MongoDB-client via `getClient()`.

## User

De logica rond gebruikers zit in `user.ts`. Beschikbare functies zijn onder andere: `getUserInfobyid`, `getUserInfobyname`, `checkUserPassword`, `createUser`.

Elke gebruiker heeft twee types: `User` en `WebUser`.

```ts
export interface User {
    id: number,
    name: string,
    role: string,
    password: string,
    mail: string
}

export interface UserWeb {
    id: number,
    name: string,
    role: string
}
```

Het verschil: `WebUser` bevat enkel de informatie die nodig is voor op de client, zoals in de JWT-token:

```ts
export async function createUserJwtToken(iduser: number) {
    const user = await getUserInfobyid(iduser);
    if (user) {
        const webUser: UserWeb = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        return jwt.sign(JSON.stringify(webUser), process.env.JWT_SECRET!);
    }
}
```

## Middleware

Bij toegang tot beveiligde routes wordt gecontroleerd of de gebruiker een geldige JWT-token heeft. Anders wordt hij doorgestuurd naar de loginpagina:

```ts
export function checkJwt(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;
    if (!token) return res.redirect("/login");

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; name: string };
        res.locals.user = user;
        next();
    } catch (err) {
        console.log("Ongeldige token:", err);
        return res.redirect("/login");
    }
}
```

Na inloggen krijgt de gebruiker een 2FA-code via e-mail. Bij correcte invoer wordt de token gegenereerd:

```ts
export async function checkIfUserHas2FFAcode(id: number, trycode: string) {
    if (!codes[id]) {
        await generate2FFA(id);
        return false;
    }

    if (codes[id] === trycode) {
        delete codes[id];
        return true;
    }

    return false;
}
```

2FA-code wordt gegenereerd en verstuurd via mail:

```ts
function generateRandomString(i: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({length: i}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
```

```ts
async function generate2FFA(id: number) {
    const userdetails = await getUserInfobyid(id);
    if (!userdetails) throw new Error('User not found');

    const generatedcode = generateRandomString(5);
    codes[id] = generatedcode;

    await sendEmail(userdetails.mail, '2FA Code', {
        username: userdetails.name,
        code: generatedcode
    });
}
```

Verzenden van de mail gebeurt met `nodemailer`:

```ts
async function sendEmail(to: string, subject: string, data: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: { rejectUnauthorized: false }
    });

    const emailHtml = await generateEmail(data);

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: emailHtml,
    });

    console.log("✅ Email verzonden:", info.response);
}
```

De HTML voor de e-mail wordt gegenereerd vanuit een Markdown-template via `mustache` en `marked`:

```ts
async function generateEmail(data: any): Promise<string> {
    const populatedMarkdown = mustache.render(markdownTemplate, data);
    return await marked(populatedMarkdown);
}
```

Voorbeeld van een template:

```md
Hey user {{username}}, this is your 2FA code: {{code}}
```

## Frontend

Voor de frontend gebruiken we routers om code op te splitsen per pagina. Alle routes worden geïmporteerd in `mainRoutes.ts`.

De eerste routes (zoals `/`, `register`, `login`) vereisen geen JWT. Daarna wordt `checkJwt` gebruikt.

Elke route heeft een eigen Express-router:

```ts
const router: Router = express.Router();
export default router;
```

Voor datamanipulatie gebruiken we Express-methodes (`get`, `post`, `put`, `delete`). Een voorbeeld van de login-route:

```ts
router.get("/", (req, res) => {
    res.render("login", { cssName: "login", e: "" });
});

router.post("/", async (req, res) => {
    const isValid = await checkUserPassword(req.body.username, req.body.password);
    const user = await getUserInfobyname(req.body.username);

    if (!user) {
        return res.render("login", { cssName: "login", e: "Invalid username" });
    }

    if (isValid) {
        await checkIfUserHas2FFAcode(user.id, "");
        return res.redirect(`/login/auth?id=${user.id}`);
    } else {
        return res.render("login", { cssName: "login", e: "Invalid password" });
    }
});
```
