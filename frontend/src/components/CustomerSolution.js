import { Container, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useMediaQuery, useTheme } from "@mui/material";

const CustomerSolution = () => {
    const solutionList = [
        ["Sign Up", "How to sign up for Netflix", "About Netflix", "Membership & Pricing"],
        [
            "Can't Watch",
            "How to change your Netflix password",
            "Trying to log in to Netflix but prompted to sign up",
            "'Your device and Netflix app version are not compatible.' message appears",
        ],
        [
            "Manage My Account",
            "Unable to log in to Netflix",
            "How to restart your Netflix account",
            "Netflix account email changed without consent",
        ],
        [
            "Watching Netflix",
            "What devices can I use to stream Netflix?",
            "How to watch Netflix on TV",
            "How to download content for offline viewing",
        ],
        [
            "Quick Links",
            "Request TV shows and movies",
            "Update email",
            "Update password",
            "Update payment method",
            "Cancel membership",
            "Review payment history",
        ],
    ];
    const theme = useTheme();
    const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Container sx={{ mb: 10 }}>
            <Grid container spacing={1} sx={{ width: "100%" }}>
                {isMiddleScreen
                    ? null
                    : solutionList.map((innerArray) => {
                          return (
                              <Grid item style={{ width: "20%" }} key={innerArray}>
                                  <List>
                                      <ListItem sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                                          {innerArray[0]}
                                      </ListItem>
                                      {innerArray.slice(1).map((i) => {
                                          return <ListItem key={i}>{i}</ListItem>;
                                      })}
                                  </List>
                              </Grid>
                          );
                      })}
            </Grid>
        </Container>
    );
};

export default CustomerSolution;
