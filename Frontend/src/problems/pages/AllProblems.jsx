import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../shared/components/context/AuthContext';

import ProblemCard from '../components/ProblemCard';
const AllProblems = () => {

    const [dsaProblems, setDsaProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {  // this will be running twice , if we are in Strict Mode ( Development)
        const fetchDSAProblems = async () => {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
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
            {isLoading && (
                <div className="max-w-3xl mx-auto mb-6">
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse" 
                             style={{
                                 backgroundSize: "200% 100%",
                                 animation: "shimmer 2s infinite"
                             }}>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto">
                {isLoading ? (
                    // Skeleton loaders
                    Array(5).fill(0).map((_, i) => (
                        <div key={i} className="mb-4 p-6 bg-white rounded-lg shadow animate-pulse">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    ))
                ) : (
                    dsaProblems.map((problem) => (
                        <ProblemCard
                            key={problem.id}
                            problemData={problem}
                            onClick={handleCardClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllProblems;
