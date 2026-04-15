
import dynamic from "next/dynamic";

const SchoolsMapClient = dynamic(() => import("./SchoolsMapClient"), { ssr: false });

export default function SchoolsMap(props: any) {
  return <SchoolsMapClient {...props} />;
}
