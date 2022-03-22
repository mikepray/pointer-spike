import { useEffect, useState } from "react";

const Contact = () => {
  const [msg, setMsg] = useState("");

  const getApiData = async () => {
    const response = await fetch(
      "/issue/1"
    ).then((response) => response.json());

    // update the state
    setMsg(response);
  };

    useEffect(() => {
      getApiData();
    }, []);

    return <>
      
      mike@mikepray.dev</>
};

export default Contact;

