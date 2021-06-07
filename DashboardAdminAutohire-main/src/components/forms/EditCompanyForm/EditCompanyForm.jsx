import React, {  useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { register } from 'serviceWorker';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';


const EditCompanyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    let history = useHistory();
    const [selectId, setSelectId] = useState();
    const onSubmit = (data) => {
        const hamma = {
            ...data,

            nom: data.name,
            adresse: data.adress,
            industry: data.industry,
            about: data.about,
            website: data.website,
            size: data.size,
            type: data.type,
            founded: data.founded,
            specialities: data.specialities
        };
       
        axios.patch(`${url}entreprise/${idCmpF}`, hamma).then(
            (response) => {
                history.push('/company');
            },
            (error) => {
               // console.log(error);
            }
        );
    };
    const [state, setState] = useState({});
    const [posts, setPosts] = useState([]); 
    let location = useLocation();
    const url = 'http://localhost:3000/' ;
    
    const nomCmp=location.search.split('=')[1]
    const idCmp=location.search.split('!')[1]
    const idCmpF=idCmp.split('=')[0]


    useEffect(() => {
        axios.get(`${url}entreprise/id/${nomCmp}`).then((res) => {
      
            setPosts(res.data);
        });
    }, []);
    return (
        
       
            <div>
             {posts.map(
                                    ({
                                        id,
                                        nom,
                                        industry,
                                        type,
                                        adresse,
                                        specialities,
                                        website,
                                        size,
                                        about,
                                        founded
                                    }) => {
                                        return (
                                      
                                            
                                            <div className='form'>
                                                 
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                          
                                           
                                                <label for='name'> Name</label>
                                                <input
                                                    placeholder={nom}
                                                    defaultValue={nom}
                                            
                                                    type='text'
                                                    {...register('name', {
                                                        validate: (value) => value.length !== 0
                                                    })}
                                                  
                                                />
                                                 {errors.name && (
                                    <p className='error'>* Please fill out this field</p>
                                )}
                  <label for='adress'> Adress</label>
                                                <input
                                                    placeholder={adresse}
                                                    
                                                    defaultValue={adresse}
                                                    type='text'
                                               
                                                    {...register('adress', {
                                                        validate: (value) => value.length !== 0
                                                    })}
                                                />
                 {errors.adress && (
                                    <p className='error'>* Please fill out this field</p>
                                )}
                                                <label for='type'>Type</label>
                                                <select
                                                    placeholder={type}
                                                    defaultValue={type}
                                                    type='text'
                                                    {...register('type', {
                                                        validate: (value) => value !== 'Choose one..'
                                                    })}
                                                >
                                                    <option>Choose one..</option>
                                                    <option value='Private'>Private </option>
                                                    <option value='Public'>Public </option>
                                                    <option value='Private  Limited'>Private Limited</option>
                                                </select>
                                                {errors.type && (
                                                    <p className='error'>* Please select an item in the list.</p>
                                                )}
                                                <label for='indtustry'>Industry</label>
                                                <select
                                                    placeholder={industry}
                                                    defaultValue={industry}
                                                    type='text'
                                                    {...register('industry', {
                                                        validate: (value) => value !== 'Choose one..'
                                                    })}
                                                >
                                                    <option>Choose one..</option>
                                                    <option value='IT'>IT</option>
                                                    <option value='Education '>Education </option>
                                                    <option value='Food '>Food </option>
                                                    <option value='Health'>Health</option>
                                                    <option value='Aerospace  '>Aerospace </option>
                                                    <option value='Transport '>Transport </option>
                                                    <option value='Telecommunication  '>Telecommunication </option>
                                                    <option value='Agriculture '>Agriculture </option>
                                                    <option value='Construction  '>Construction </option>
                                                    <option value='Pharmaceutical '>Pharmaceutical </option>
                                                    <option value='Entertainment  '>Entertainment </option>
                                                    <option value='Media'>Media</option>
                                                    <option value='Energy  '>Energy </option>
                                                    <option value='Manufacturing '>Manufacturing </option>
                                                    <option value='Music  '>Music </option>
                                                    <option value='Mining  '>Mining </option>
                                                    <option value='Electronics  '>Electronics </option>
                                                </select>
                                                {errors.industry && (
                                                    <p className='error'>* Please select an item in the list.</p>
                                                )}
                
                                                <label for='about'>About</label>
                                                <input
                                                    placeholder={about}
                                                    defaultValue={about}
                                                    type='text'
                                                    {...register('about', {
                                                        validate: (value) => value.length !== 0
                                                    })}
                                                />
                                                {errors.about && (
                                                    <p className='error'>* Please fill out this field</p>
                                                )}
                                                <label for='website'>website</label>
                                                <input
                                                    placeholder={website}
                                                    defaultValue={website}
                                                    type='text'
                                                    {...register('website', {
                                                        validate: (value) => value.length !== 0
                                                    })}
                                                />
                                                {errors.website && (
                                                    <p className='error'> *Please fill out this field</p>
                                                )}
                  <label for='specialities'>specialities</label>
                                                <input
                                                    placeholder={specialities}
                                                    defaultValue={specialities}
                                                    type='text'
                                                    {...register('specialities', {
                                                        validate: (value) => value.length !== 0
                                                    })}
                                                />
                                                {errors.specialities && (
                                                    <p className='error'> *Please fill out this field</p>
                                                )}
                                                <label for='founded'>year of foundation</label>
                                                <input
                                                    placeholder={founded}
                                                    defaultValue={founded}
                                                    type='text'
                                                    {...register('founded', {
                                                        validate: (value) => value.length === 4
                                                    })}
                                                />
                                                {errors.founded && <p className='error'>* must be a year</p>}
                
                                                <label for='size'>Size</label>
                                                <select
                                                    placeholder={size}
                                                    defaultValue={size}
                                                    type='text'
                                                    {...register('size', {
                                                        validate: (value) => value !== 'Choose one..'
                                                    })}
                                                >
                                                    <option>Choose one..</option>
                                                    <option value='1- 5 employees'>1- 10 employees</option>
                                                    <option value='10-50 employees'>10-50 employees</option>
                                                    <option value='50-100 employees'>50-100 employees</option>
                                                    <option value='more than 100 employees'>
                                                        more than 100 employees
                                                    </option>
                                                </select>
                                                {errors.size && (
                                                    <p className='error'>* Please select an item in the list.</p>
                                                )}
                
                                                
                
                                                <button
                                                    type='submit'
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        padding: '14px 20px',
                                                        margin: '8px 0',
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Add Company
                                                </button>
                                            </form>
                                        </div>
                                            );
                                        }
                                    )}
          
                                       
                                
                                 
        </div>
    );
};

export default EditCompanyForm;
