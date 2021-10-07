import Account from "../../components/Account";

export default function AccountPage(props) {
  return <Account {...props} />;
}

export async function getServerSideProps(context) {
  console.log("access");
  const { section } = context.params;
  console.log(section)
  // return {
  //   props: {
  //     activeTab: 1,
  //   }
  // }
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
