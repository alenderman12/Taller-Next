
import Link from "next/link";

export default function UserLink({ userName, userId }) {
    return (<Link href={`/Usuario/${userId}`} className="text-indigo-600 hover:text-indigo-800">
                      {userName}
            </Link>);
}