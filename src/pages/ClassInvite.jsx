import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../service/userService";
import axios from "axios";

export default function ClassInvite() {
  const navigate = useNavigate();
  const { class_code } = useParams();
  const checkClassInvite = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/classes/code/${class_code}`;
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      if (data) {
        const user = await getProfile();
        var pathBase;
        if (user.Type == "student") pathBase = "/student";
        else pathBase = "/teacher";
        const path = `${pathBase}/class-detail/${data.class_id}`;
        navigate(path);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkClassInvite();
  });

  return <div>ClassInvite</div>;
}
