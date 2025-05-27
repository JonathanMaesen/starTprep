import express, { Router } from "express";
import { deleteFloorElemenut, floor, pushFloorElement, updateFloorElement } from "../data/datausages";
import { Floorelement } from "../data/types";
import { stringify } from "querystring";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("floor", {
        floordata : floor.sort((a: Floorelement, b: Floorelement): number => {return Number(a.follownummer) - Number(b.follownummer)}),
        cssName: "floor"
    });
});

router.get("/make", (req,res) => {
    res.render("createfloor",{
        cssName: "floor",
        e : ""
    });
});

router.post("/make", async (req,res) => {
const id: string | null = typeof req.body.id == "string" ? req.body.id : null;
    if(id == null){
        return res.redirect("/floor");
    }
    let amount : number | null = 0;
    try {
        amount = typeof req.body.amount == "string" ? Number(req.body.amount) : null;
    } catch (error) {
        amount = null;
    }
    if((amount == null) || (isNaN(amount))){
        return res.redirect("/make");
    }
    const filtereditem:Floorelement | null = floor.find((e:Floorelement) : boolean => { return e.follownummer == id}) ?? null;
    if(filtereditem){
        return res.render("createfloor",{
        cssName: "floor",
        e : "id is al in gebruik"
    });
    }
    await pushFloorElement({follownummer: id, amount: amount});
    return res.redirect("/floor");
});

router.get("/update/:id", (req,res) => {
    let id : number | null = 0;
    try {
        id = typeof req.params.id == "string" ? Number(req.params.id) : null
    } catch (error) {
        id = null
    }
    if((id == null) || (isNaN(id))){
        return res.redirect("/floor")
    }
    const filtereditem:Floorelement | null = floor.find((e:Floorelement) : boolean => { return Number(e.follownummer) == id}) ?? null;
    if(filtereditem == null){
        return res.redirect("/floor");
    }
    res.render("editfloor",{
        floordata: filtereditem, 
        cssName: "floor"
    });
});

router.post("/update", async (req,res) => {
    const id: string | null = typeof req.body.id == "string" ? req.body.id : null;
    if(id == null){
        return res.redirect("/floor");
    }
    let amount : number | null = 0;
    try {
        amount = typeof req.body.amount == "string" ? Number(req.body.amount) : null;
    } catch (error) {
        amount = null;
    }
    if((amount == null) || (isNaN(amount))){
        return res.redirect("/floor")
    }
    const updateddata:Floorelement = { follownummer : id, amount : amount};
    await updateFloorElement(id, updateddata);
    return res.redirect("/floor");
});

router.post("/delete", async (req,res) => {
    const id: string | null = typeof req.body.id == "string" ? req.body.id : null;
    if(id == null){
        return res.redirect("/floor");
    }
    await deleteFloorElemenut(id);
    return res.redirect("/floor");
});

router.use((req, res) =>{
    res.redirect("/floor");
});

    function findMissingNumbers(arr: Floorelement[]): number[] {
    const numbers:number[] = arr.map(el => Number(el.follownummer));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    const missing: number[] = [];

    for (let i = min; i <= max; i++) {
        if (!numbers.includes(i)) {
        missing.push(i);
        }
    }

    return missing;
    }

export default router;