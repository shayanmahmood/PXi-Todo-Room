import { useEffect, useState } from "react";
import { useAddMessage } from "./useAddMessage";
import { useDocs } from "./UseDocs";
import Loader from "../../components/Loader";
import { ColorRing } from "react-loader-spinner";

function MessageApp() {
  const [message, setMessage] = useState("");
  const { AddDocs, isLoading } = useAddMessage();
  const { data, isLoading: isloading } = useDocs();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        AddDocs(
          { message },
          {
            onSettled: () => {
              setMessage("");
            },
          }
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [message, AddDocs]);

  return (
    <div className="wrapper">
      <div className="task-input">
        {!isLoading || isloading ? (
          <ColorRing
            visible={true}
            height="20"
            width="20"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#ff5678", "#ff5678", "#ff5678", "#ff5678", "#ff5678"]}
          />
        ) : (
          <img src="./icon/bars-icon.svg" alt="icon" />
        )}
        <input
          type="text"
          placeholder="Enter Your Task for Today!"
          value={message}
          disabled={isLoading || isloading}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="controls">
        <div className="filters">
          <span className="active" id="all">
            Add what's in your mind
          </span>
        </div>
        <button className="clear-btn active">Clear All</button>
      </div>
      <ul className="task-box">
        {data?.map((data) => (
          <>
            <li className="task">
              <label>
                <p class="Completed">{data.message}</p>
              </label>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default MessageApp;
