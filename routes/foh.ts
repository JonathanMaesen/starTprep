import express, { Router } from "express";
import { floor } from "../data/datausages";
import { Floorelement } from "../data/types";
import { pushFloorElement } from "../data/datausages";

const router: Router = express.Router();

export function sortByFollownumberASC(
    list: Floorelement[],
): Floorelement[] {
    return [...list].sort(
        (a, b) => Number(a.follownummer) - Number(b.follownummer),
    );
}

export function sortByFollownumberDESC(
    list: Floorelement[],
): Floorelement[] {
    return [...list].sort(
        (a, b) => Number(b.follownummer) - Number(a.follownummer),
    );
}

function nextTableNumberFirstGap(list: Floorelement[]): string {
    const taken = new Set<number>(
        list.map(el => Number(el.follownummer)),
    );

    let candidate = 1;
    while (taken.has(candidate)) candidate++;

    return String(candidate);
}

router.get("/", (req, res) => {
    const sort = (req.query.sort as string | undefined)?.toLowerCase();
    const q = (req.query.q as string | undefined)?.trim() ?? "";

    let data: Floorelement[] = q
        ? floor.filter(el => el.follownummer.toLowerCase().includes(q.toLowerCase()))
        : floor;

    data = sort === "desc"
        ? sortByFollownumberDESC(data)
        : sort === "asc"
            ? sortByFollownumberASC(data)
            : data;

    res.render("foh", {
        cssName: "foh",
        floorData: data,
        sort,
        q,
    });
});

router.post("/", async (req, res) => {
    pushFloorElement({
        follownummer: nextTableNumberFirstGap(floor),
        amount: 0,
    });

    res.redirect("/foh");
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const idx = floor.findIndex(t => t.follownummer === id);

    if (idx === -1) return res.status(404).json({ error: "not found" });

    floor.splice(idx, 1);
    res.status(204).end();
});


export default router;