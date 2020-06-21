export type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
export type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
export type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;
export type KeysOfType<Base, Condition> = keyof SubType<Base, Condition>;
