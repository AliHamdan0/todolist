import { Modal, CircularProgress } from "@mui/material";
import { useState } from "react";
import style from "../../styles/Home.module.css";
import { Tasks } from "../../helpers/endPoints";
import axios from "axios";
export default function AddModule(props) {
  const { open, setOpen, refetch } = props;
  const [titleAdd, setTitleAdd] = useState("");
  const [desAdd, setDesAdd] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddTask = () => {
    setLoading(true);
    axios
      .post(Tasks, {
        title: titleAdd,
        subject: desAdd,
      })
      .then((res) => {
        setLoading(false);
        setTitleAdd("");
        setDesAdd("");
        setOpen(false);
        refetch();
      });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        sx={{
          outline: "none",
          border: "none",
          padding: "15px",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className={style.addModuleCont}>
          <h6 className={style.titleModule}>Add a new task</h6>
          <input
            type="text"
            placeholder="Title"
            value={titleAdd}
            onChange={(e) => setTitleAdd(e.target.value)}
            className={style.moduleInput}
          />
          <textarea
            cols={10}
            rows={10}
            placeholder="Subject"
            value={desAdd}
            onChange={(e) => setDesAdd(e.target.value)}
            className={style.moduleArea}
          />
          <button
            className={style.addModButton}
            onClick={(e) => handleAddTask()}
          >
            Add
            {loading == true && (
              <CircularProgress sx={{ color: "white", ml: "8px" }} size={20} />
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
