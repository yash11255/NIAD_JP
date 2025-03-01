import { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);
    
    const [companyName, setCompanyName] = useState('');
    const [companyDesc, setCompanyDesc] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyState, setCompanyState] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');

    const [hrName, setHrName] = useState('');
    const [hrEmail, setHrEmail] = useState('');
    const [hrPhone, setHrPhone] = useState('');

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const { backendUrl, companyToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const description = quillRef.current.root.innerHTML;

            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level, 
                  companyName, companyDesc, companyCity, companyState, companyCountry,
                  hrName, hrEmail, hrPhone },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setSalary(0);
                setCompanyName('');
                setCompanyDesc('');
                setCompanyCity('');
                setCompanyState('');
                setCompanyCountry('');
                setHrName('');
                setHrEmail('');
                setHrPhone('');
                quillRef.current.root.innerHTML = "";
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='container p-6 bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto'>

            <h2 className="text-2xl font-semibold mb-5">Post a New Job</h2>

            {/* Job Title */}
            <div className='mb-4'>
                <label className='block font-medium mb-1'>Job Title</label>
                <input type="text" placeholder='Enter job title'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                />
            </div>

            {/* Job Description */}
            <div className='mb-4'>
                <label className='block font-medium mb-1'>Job Description</label>
                <div ref={editorRef} className='border-2 border-gray-300 rounded p-2 min-h-[150px]'></div>
            </div>

            {/* Job Details */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>

                <div>
                    <label className='block font-medium mb-1'>Job Category</label>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500' onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block font-medium mb-1'>Job Location</label>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block font-medium mb-1'>Job Level</label>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500' onChange={e => setLevel(e.target.value)}>
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Senior level">Senior level</option>
                    </select>
                </div>

            </div>

            {/* Salary */}
            <div className='mb-4'>
                <label className='block font-medium mb-1'>Job Salary</label>
                <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px] focus:outline-blue-500' 
                    onChange={e => setSalary(e.target.value)} type="Number" placeholder='2500' />
            </div>

            {/* About Company Section */}
            <h3 className="text-lg font-semibold mt-6 mb-2">About Company</h3>

            <div className='mb-4'>
                <label className='block font-medium mb-1'>Company Name</label>
                <input type="text" placeholder="Enter company name"
                    onChange={e => setCompanyName(e.target.value)} value={companyName}
                    required
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                />
            </div>

            <div className='mb-4'>
                <label className='block font-medium mb-1'>Short Description</label>
                <textarea rows="3" placeholder="Briefly describe the company..."
                    onChange={e => setCompanyDesc(e.target.value)} value={companyDesc}
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                ></textarea>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                <div>
                    <label className='block font-medium mb-1'>City</label>
                    <input type="text" placeholder="City"
                        onChange={e => setCompanyCity(e.target.value)} value={companyCity}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                    />
                </div>

                <div>
                    <label className='block font-medium mb-1'>State</label>
                    <input type="text" placeholder="State"
                        onChange={e => setCompanyState(e.target.value)} value={companyState}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                    />
                </div>

                <div>
                    <label className='block font-medium mb-1'>Country</label>
                    <input type="text" placeholder="Country"
                        onChange={e => setCompanyCountry(e.target.value)} value={companyCountry}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-500'
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button className='w-full py-3 mt-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition'>
                Post Job
            </button>

        </form>
    )
}

export default AddJob