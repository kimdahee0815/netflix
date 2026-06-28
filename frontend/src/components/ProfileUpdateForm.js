import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel } from "@mui/material";

const ProfileUpdateForm = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#141414",
                padding: "50px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <hr
                    style={{
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        borderWidth: "1px",
                        marginBottom: "20px",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ marginRight: "10px", color: "#fff" }}>Language:</label>
                    <select
                        sx={{
                            borderRadius: "10px",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                            backgroundColor: "#000",
                            padding: "5px",
                        }}
                    >
                        <option value="ko">Korean</option>
                        <option value="en">English</option>
                        <option value="ch">Chinese</option>
                    </select>
                </div>
            </div>
            <hr
                style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: "1px",
                    marginTop: "10px",
                }}
            />
            <p style={{ color: "#fff", marginTop: "20px" }}>Maturity Settings:</p>
            <p style={{ color: "#fff", marginBottom: "10px" }}>
                <span style={{ color: "gray" }}>All Ratings</span>
            </p>
            <p style={{ color: "#fff", marginBottom: "20px" }}>
                This profile displays content of all maturity levels.
            </p>
            <Button
                variant="outlined"
                sx={{
                    color: "#c4c4c4",
                    border: "1px solid #c4c4c4",
                    backgroundColor: "#000",
                    marginRight: "10px",
                    "&:hover": {
                        backgroundColor: "#c4c4c4",
                        color: "#000",
                    },
                }}
            >
                Edit
            </Button>
            <hr
                style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: "1px",
                    marginTop: "20px",
                }}
            />
            <h3 style={{ color: "#fff", marginTop: "20px" }}>Autoplay Settings</h3>
            <FormControlLabel
                control={
                    <Checkbox
                        style={{
                            color: "#c4c4c4",
                        }}
                    />
                }
                label="Autoplay next episode of a series on all devices"
                labelPlacement="end"
                sx={{
                    color: "#fff",
                }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        style={{
                            color: "#c4c4c4",
                        }}
                    />
                }
                label="Autoplay previews while browsing on all devices"
                labelPlacement="end"
                sx={{
                    color: "#fff",
                }}
            />
            <hr
                style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: "1px",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            />
        </Box>
    );
};

export default ProfileUpdateForm;
