import { open } from "lmdb";

export const db = open({ path: "db" });
