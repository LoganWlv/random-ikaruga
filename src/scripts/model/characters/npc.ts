import { Spawnable } from "../interactions/spawnable";
import Character from "./character";

export default abstract class Npc extends Character implements Spawnable {}
