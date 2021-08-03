import { useState, useEffect } from "react";

export default function Success({ success }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {success}
      </div>
    </div>
  );
}
