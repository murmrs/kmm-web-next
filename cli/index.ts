import { Command } from "commander";
import { syncRestaurants } from "./sync";

const program = new Command();

program.command("sync").action(syncRestaurants);

program.parse();

export default program;
