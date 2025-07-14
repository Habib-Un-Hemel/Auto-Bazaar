import * as React from "react";
import PropTypes from "prop-types";

const AlertDialogContext = React.createContext();

export function AlertDialog({ open, onOpenChange, children }) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (value) => {
    setIsOpen(value);
    if (onOpenChange) {
      onOpenChange(value);
    }
  };

  return (
    <AlertDialogContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export function AlertDialogContent({ children }) {
  const context = React.useContext(AlertDialogContext);
  if (!context.isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        {children}
      </div>
    </div>
  );
}

AlertDialogContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

AlertDialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

AlertDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AlertDialogDescription({ children }) {
  return <p className="text-sm text-gray-600 mt-2">{children}</p>;
}

AlertDialogDescription.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AlertDialogFooter({ children }) {
  return <div className="mt-6 flex justify-end space-x-2">{children}</div>;
}

AlertDialogFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AlertDialogAction({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {children}
    </button>
  );
}

AlertDialogAction.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export function AlertDialogCancel({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
    >
      {children}
    </button>
  );
}

AlertDialogCancel.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
