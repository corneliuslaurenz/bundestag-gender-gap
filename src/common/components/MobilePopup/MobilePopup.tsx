import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";
import useIsDesktop from "../../hooks/useIsDesktop";
import useIsLargeHeight from "../../hooks/useIsLargeHeight";

/**
 * Component can be used to show a popup.
 * Is always on top and stops exploration.
 */
const MobilePopup = ({
  popupIsOpen,
  setPopupIsOpen,
}: {
  popupIsOpen: boolean;
  setPopupIsOpen: (val: boolean) => void;
}) => {
  const isDesktop = useIsDesktop(950);
  const isLargeHeight = useIsLargeHeight(800);

  useEffect(() => {
    if ((!isDesktop || !isLargeHeight) && !popupIsOpen) {
      setPopupIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setPopupIsOpen(false);
  };

  return (
    <Box sx={{ zIndex: 99999999999999 }}>
      <Dialog
        open={popupIsOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "15px",
            backgroundColor: "#B1C6DF",
            maxWidth: "320px",
            maxHeight: "500px",
            boxSizing: "border-box",
          },
          zIndex: 99999999999999,
        }}
      >
        <DialogTitle>
          <Typography
            variant="h2"
            sx={{ color: "#3C486C", textAlign: "center" }}
          >
            Eingeschränkte Darstellung
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.5,
              color: "#3C486C",
              textAlign: "center",
              "@media (max-height: 800px)": {
                fontSize: "1rem",
              },
            }}
          >
            Diese Anwendung ist für Screens ab 950 Pixeln Breite und 800 Pixeln
            Höhe optimiert. Andernfalls kann es zu Einschränkungen in Verhalten
            und Darstellungen kommen.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="body1" sx={{ color: "#3C486C" }}>
              Verstanden
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MobilePopup;
