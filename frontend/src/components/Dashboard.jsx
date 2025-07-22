import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [user, setUser] = useState(null);

  const handleShow = () => setShowForm((prev) => !prev);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/me", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("User not authenticated", error);
      window.location.href = "/login"; // redirect if not logged in
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getnotes", {
        withCredentials: true,
      });
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/newnotes",
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        console.log("Success");
        reset();
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletenote/${id}`, {
        withCredentials: true,
      });
      fetchData(); // refresh notes
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/updatenote/${selectedNote._id}`,
        {
          name: editTitle,
          content: editContent,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Note updated!");
        fetchData(); // refresh notes
        setEditMode(false);
        setSelectedNote(null);
      }
    } catch (err) {
      console.error("Failed to update note:", err);
      alert("Update failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      window.location.href = "/login"; // or use navigate("/login")
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    <div className="main-dash-container">
      <div className="dash-box">
        <div className="dash-header">
          <h1>Welcome, {user?.name}</h1>
          <button className="add-btn" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} className="btn-icon" />
          </button>
          <button className="add-btn" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="btn-icon"
            />
          </button>
        </div>

        {/* Floating Form Overlay */}
        {showForm && (
          <div className="form-overlay" onClick={() => setShowForm(false)}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="note-form-floating"
              onClick={(e) => e.stopPropagation()} // prevent background click
            >
              <input
                type="text"
                placeholder="Note Heading"
                {...register("name", { required: "Heading is required" })}
              />

              <textarea
                placeholder="Note Content"
                rows={5}
                {...register("content", { required: "Content is required" })}
              ></textarea>

              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notes Cards Display Placeholder */}
        <div className="note-cards-box">
          {notes && notes.note.length > 0 ? (
            notes.note.map((note) => (
              <div key={note._id} className="note-card">
                <div className="card-header">
                  <h3 onClick={() => setSelectedNote(note)}>{note.name}</h3>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDelete(note._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: "1rem" }}>No notes found.</p>
          )}
        </div>

        {selectedNote && (
          <div
            className="form-overlay"
            onClick={() => {
              setSelectedNote(null);
              setEditMode(false);
            }}
          >
            <div
              className="note-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Note Title"
                  />
                  <textarea
                    rows="5"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Note Content"
                  ></textarea>
                  <div className="form-actions">
                    <button onClick={handleUpdate}>Save</button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>{selectedNote.name}</h2>
                  <p>{selectedNote.content}</p>
                  <div className="form-actions">
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setEditTitle(selectedNote.name);
                        setEditContent(selectedNote.content);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => setSelectedNote(null)}>Close</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
