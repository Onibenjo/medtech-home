import React, { useState } from "react"
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"
import { useDocument } from "hooks/useDocument"
import Typography from "@material-ui/core/Typography"
import { useAuth } from "utils/use-auth"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import WithdrawalContent from "../WithdrawalContent"

const AccountDetails = () => {
  const [add, setAdd] = useState(false)
  const { user } = useAuth()
  const {
    data: accounts,
    loading,
  } = useDocument(`doctors/${user.uid}/private/bank_accounts`, { listen: true })

  if (user.service !== "paid") {
    return (
      <GridContainer>
        <GridItem md={2} />
        <GridItem md={8} sm={12}>
          <Typography variant="subtitle1" color="textSecondary">
            For paid doctors only
          </Typography>
        </GridItem>
      </GridContainer>
    )
  }

  return (
    <>
      <GridContainer>
        <GridItem md={8} sm={12}>
          <Paper style={{ padding: "1rem" }}>
            <Typography component="h5" variant="h6">
              Bank Accounts
            </Typography>
            <Divider light />
            <Typography
              component="p"
              variant="body1"
              // variant="subtitle2"
            >
              Add and remove banking information for withdrawing to, you can add
              up to 5 bank accounts that you own.
            </Typography>
            {loading ? (
              <CircularProgress size={18} style={{ marginTop: 16 }} />
            ) : (
              <div>
                {accounts.accounts ? (
                  <>
                    <Button
                      color="primary"
                      size="medium"
                      onClick={() => setAdd(!add)}
                      variant="outlined"
                    >
                      Add bank account
                    </Button>
                    <br />
                    <br />
                    <Paper variant="outlined" elevation={0}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {accounts.accounts.map((acc, i) => (
                          <div
                            key={i}
                            style={{ flex: "1 0 auto", padding: "0.5rem" }}
                          >
                            <Typography component="h6" variant="h6">
                              {acc.accountNumber.substring(0, 6)}****
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {acc.accountName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {acc.bankName}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </Paper>
                  </>
                ) : (
                  <WithdrawalContent />
                )}

                {add && <WithdrawalContent />}
              </div>
            )}
          </Paper>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default AccountDetails
