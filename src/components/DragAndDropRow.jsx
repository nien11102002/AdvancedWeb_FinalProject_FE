// DragAndDropRow.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button, Form } from "react-bootstrap";

const ItemTypes = {
  ROW: "row",
};

const DragAndDropRow = ({
  index,
  moveRow,
  deleteRow,
  handleInputChange,
  name,
  percentage,
  readMode,
}) => {
  const [, ref] = useDrag({
    type: ItemTypes.ROW,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const formatPercentage = (value) => {
    return `${value}%`; // Format the value as a percentage
  };

  return (
    <tr ref={(node) => ref(drop(node))}>
      <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
      <td>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
          readOnly={readMode}
        />
      </td>
      <td className="d-flex justify-content-center align-items-center">
        <Form.Control
          type="number"
          value={percentage}
          onChange={(e) =>
            handleInputChange(index, "percentage", e.target.value)
          }
          readOnly={readMode}
          style={{ marginRight: "10px", width: "100px" }}
        />
        <span>%</span>
      </td>

      {!readMode ? (
        <td>
          <Button variant="danger" onClick={() => deleteRow(index)}>
            X
          </Button>
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
};

export default DragAndDropRow;
