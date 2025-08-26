import { Divider } from "@mui/material";
import CustomerAsk from "../components/CustomerAsk";
import CustomerSolution from "../components/CustomerSolution";
import StickyHeader from "../components/StickyHeader";
import CustomerPersonal from "../components/CustomerPersonal";

const Customercenter = () => {
    return (
        <div>
            <StickyHeader kind="고객센터" />
            <CustomerPersonal />
            <Divider />
            <CustomerSolution />
            <CustomerAsk />
        </div>
    );
};

export default Customercenter;
