import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SubmissionType from "../../shared/Utils/SubmissionTypeHelper";
import SubmissionDetails from "../components/SubmissionDetails";
import axios from "axios";

const SubmissionPage = () => {
    const [submissionsRecords, setSubmissionsRecords] = useState([]);
    const urlParams = useParams();   // It is of a string , convert it to a number and use it.

    const subType = Number(urlParams.submissionType);
    let problemId;
    if (urlParams.problemId) {
        problemId = urlParams.problemId;
    }

    const getSubmissionURL = (subType, problemId) => {
        let endSubmissionUrl;
        // build URL to get Submissions Records 
        switch (subType) {
            case SubmissionType.ALL_MY_SUBMISSIONS:
                endSubmissionUrl = "/mySubmissions";
                break;
            case SubmissionType.ALL_PROBLEM_SUBMISSIONS:
                endSubmissionUrl = `/${problemId}/all`;
                break;
            case SubmissionType.ALL_MY_PROBLEM_SUBMISSIONS:
                endSubmissionUrl = `/${problemId}/mySubmissions`;
                break;
        }
        return `${import.meta.env.VITE_API_BACKEND_URL}/submission` + endSubmissionUrl;
    }


    // useEffect for fetching submissions records  
    useEffect(() => {  // this will be running twice , as we are in Strict Mode ( Development)
        const fetchSubmissionsRecords = async () => {
            try {
                const response = await axios.get(getSubmissionURL(subType, problemId), {
                    withCredentials: true,
                });

                const dataFetched = response.data;
                const retreivedSubmissionRecords = dataFetched.submissions;
                // update the state 
                setSubmissionsRecords(retreivedSubmissionRecords);
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            }
        };
        fetchSubmissionsRecords();
    }, []);

    return (
        <SubmissionDetails submissions={submissionsRecords} />
    )
};

export default SubmissionPage;