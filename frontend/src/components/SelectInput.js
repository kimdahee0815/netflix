import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput({
    ref1,
    onChange,
    passwordQuestion,
    setPasswordQuestion,
    setPwQError,
    kind,
    pw_question,
    onKeyPress,
}) {
    const handleChange = (event) => {
        setPasswordQuestion((value) => event.target.value);

        if (event.target.value === "") {
            setPwQError("Please select a security question.");
        } else {
            setPwQError("");
        }
    };

    if (kind === "memberupdate") {
        setPasswordQuestion((value) => pw_question);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: "white",

                        pt: 1,
                        mt: -1,
                        fontSize: "20px",
                    }}
                    id="simple-select-label"
                >
                    Password Questions
                </InputLabel>
                <Select
                    onKeyPress={onKeyPress}
                    labelId="simple-select-label"
                    name="pwQ"
                    id="simple-select"
                    value={passwordQuestion}
                    label="passwordQuestions"
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: "white" } }}
                    labelStyle={{ color: "white" }}
                    sx={{
                        my: 1,
                        width: 360,
                        background: "#38393b",
                        color: "white",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    }}
                >
                    <MenuItem value="What is your most treasured possession?">What is your most treasured possession?</MenuItem>
                    <MenuItem value="Is there a date you want to remember?">Is there a date you want to remember?</MenuItem>
                    <MenuItem value="What is the name of a book that impressed you?">What is the name of a book that impressed you?</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
