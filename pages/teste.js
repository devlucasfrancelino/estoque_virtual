import Alert from "@/components/Alert";
import { useState } from "react";

export default function teste() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
        }}
      />
      {showPopup && <Alert onClose={() => setShowPopup(false)} text={"Senha Incorreta"} />}
    </div>
  );
}
