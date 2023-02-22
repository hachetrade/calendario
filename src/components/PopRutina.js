import React from "react";
import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PopRutina = ({ openEvent, handleEventClose, rutina }) => {
  return (
    <div>
      <Dialog open={openEvent} onClose={handleEventClose}>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: 30 }}>
          {rutina.name}
        </DialogTitle>
        <DialogContent sx={{ fontWeight: "bold", fontSize: 20 }}>
          {rutina.patient?.name}
        </DialogContent>
        {rutina.rounds?.map((round) => {
          return (
            <>
              <DialogContentText
                key={round.order}
                sx={{ fontWeight: "bold", fontSize: 20 }}
              >
                Round-
                {round.order}-{round.roundName}
              </DialogContentText>
              <DialogContentText
                key={round.order}
                sx={{ fontWeight: "bold", fontSize: 15 }}
              >
                Exercise -{round.excercises.map((exer) => exer.exercise.name)}
              </DialogContentText>
              <DialogContentText
                key={round.order}
                sx={{ fontWeight: "bold", fontSize: 15 }}
              >
                {round.excercises.map((exer) => exer.exercise.explanation)}
              </DialogContentText>
              <DialogContentText
                key={round.order}
                sx={{ fontWeight: "bold", fontSize: 15 }}
              >
                {round.excercises.map((exer) => exer.exercise.precautions)}
              </DialogContentText>
            </>
          );
        })}
        <DialogActions>
          <Button onClick={handleEventClose}>Cancel</Button>
          <Button onClick={handleEventClose}>Editar Rutina</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopRutina;
