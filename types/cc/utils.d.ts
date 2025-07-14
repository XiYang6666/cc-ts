/* @internal */
interface BlockInfo {
  name: string;
  state: Record<string, any>;
  tags: Record<string, boolean>;
}

/* @internal */
interface ItemDetail {
  name: string;
  count: number;
}
