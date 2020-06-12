import { RootState } from "../configureStore/store";
declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
