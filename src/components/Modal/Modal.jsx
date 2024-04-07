import styles from "./Modal.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VerticallyCenteredModal(props) {
  return (
    <Modal
      className={styles.modalStyle}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="true"
    >
      <Modal.Header closeButton>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          {" "}
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <pre>{props.list}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
