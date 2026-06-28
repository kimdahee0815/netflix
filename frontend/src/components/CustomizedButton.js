import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#dd1923",
    borderColor: "#cc2c24",
    borderRadius: "5px",
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
        backgroundColor: "#f94449",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: "#f94449",
    },
    "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(221,25,35,.5)",
    },
});

export default function CustomizedButton(props) {
    const { value } = props;

    return (
        <div>
            {value === "delete-login-info" ? (
                <BootstrapButton
                    value={value}
                    onClick={props.onClick}
                    variant="contained"
                    disableRipple
                    sx={{ width: 200, borderRadius: "5px" }}
                >
                    {props.label}
                </BootstrapButton>
            ) : value === "delete-account" ? (
                <BootstrapButton
                    value={value}
                    onClick={props.onClick}
                    variant="contained"
                    disableRipple
                    sx={{ width: 200, borderRadius: "5px", mb: 5 }}
                >
                    {props.label}
                </BootstrapButton>
            ) : (
                <BootstrapButton
                    value={value}
                    onClick={props.onClick}
                    variant="contained"
                    disableRipple
                    sx={{ borderRadius: "5px" }}
                >
                    {props.label}
                </BootstrapButton>
            )}
        </div>
    );
}
