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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
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
