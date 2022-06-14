import { useContext } from "react";
import Context from "./Context";

export const useSearchStore = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
}