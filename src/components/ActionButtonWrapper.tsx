import ActionButton from "./ActionButton";

interface ActionButtonWrapperProps {
  markAsDoneFn: () => void;
  editFn: () => void;
}

function ActionButtonWrapper({
  editFn,
  markAsDoneFn,
}: ActionButtonWrapperProps) {
  return (
    <div className="flex gap-2 mt-1 ml-1">
      <ActionButton label="Mark as Done" onClick={markAsDoneFn} />
      <ActionButton label="Edit" onClick={editFn} />
    </div>
  );
}

export default ActionButtonWrapper;
