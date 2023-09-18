import React, { useEffect, useState } from "react";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import "../App.css";
import Button from "@mui/material/Button";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [modalPlayer, setModalPlayer] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/players").then((res) => {
      console.log(res.data);
      setPlayers(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    setOpen(false);
    axios
      .delete(`http://localhost:8000/players/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const openModal = (player) => {
    setModalPlayer(player);
    setOpen(true);
  };

  return (
    <div className="player-list-table">
      <Menu>
        <MenuItem url="/players/list" item="List" />
        <MenuItem url="/players/addplayers" item="Add Player" />
      </Menu>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Preferred Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        {players.length > 0 &&
          players.map((player, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => openModal(player)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <DeleteModal
        player={modalPlayer}
        open={open}
        onSetOpen={setOpen}
        onHandleDelete={handleDelete}
      />
    </div>
  );
};

export default PlayersList;
