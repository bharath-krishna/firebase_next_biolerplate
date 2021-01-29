import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AutoBreadCrumbs from "../../components/AutoBreadCrumbs";
import CustomAppBar from "../../components/CustomAppBar";
import { getById } from "../../utils/general";
import { useAuthUser, withAuthUser } from "../../utils/NextFirebaseAuth";

function TempleItem() {
  const authUser = useAuthUser();
  const router = useRouter();
  const { id } = router.query;
  const [temple, setTemple] = useState();

  useEffect(() => {
    getById("temples", id).then((data) => {
      if (data) {
        setTemple(data);
      }
    });
  }, [id]);

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
    </React.Fragment>
  );
}
export default withAuthUser()(TempleItem);
