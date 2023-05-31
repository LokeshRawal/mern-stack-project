import { Button } from "react-bootstrap";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

export const ActionButtons = ({cancelText="Cancel", submitText="Submit"}) => {
    return (<>
        <Button type="reset" variant="danger" size="sm" className="me-3">
            <FaTrash /> {cancelText}
        </Button>

        <Button type="submit" variant="success" size="sm" >
            <FaPaperPlane /> {submitText}
        </Button>
    </>)
}