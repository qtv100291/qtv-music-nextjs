import { async } from "regenerator-runtime";
import Account from "../../components/Account";

export default function AccountPage(props) {
  return <Account {...props} />;
}

export async function getServerSideProps(context) {
  const { section } = context.params;
  if (section === "thong-tin-tai-khoan") {
    return {
      props: {
        activeTab: 1,
      },
    };
  } else
    return {
      props: {
        activeTab: 2,
      },
    };
}
