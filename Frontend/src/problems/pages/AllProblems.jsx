import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../shared/components/context/AuthContext';

import ProblemCard from '../components/ProblemCard';
const AllProblems = () => {

    const [dsaProblems, setDsaProblems] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {  // this will be running twice , if we are in Strict Mode ( Development)
        const fetchDSAProblems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/problem/all`, {
                    withCredentials: true,
                });

                const dataFetched = response.data;
                const problemsRetrieved = dataFetched.allProblems;
                // update the state 
                setDsaProblems([...problemsRetrieved]);   // push all the array values in a new Array 
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            }
        };
        fetchDSAProblems();
    }, []);


    const handleCardClick = (problem) => {
        if (isAuthenticated) {
            navigate(`/problem/${problem.id}`);
        } else {
            navigate("/auth");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto">
                {dsaProblems.map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        problemData={problem}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllProblems;
