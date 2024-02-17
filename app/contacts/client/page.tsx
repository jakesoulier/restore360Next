'use client'
import { TextField, Text, Select, Button } from "@radix-ui/themes"
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
// import {navigate} from '../../actions';
import './styles.css'
// import styles from ''

const viewContactPage = () => {
  return (
    <div>
        <h1>Jake Soulier</h1>
    <br/>
        <div>
            <h1>Edit Profile</h1>
        <TextField.Root>
                    <TextField.Input placeholder="Name"  />
                </TextField.Root>
                
                
                
                <TextField.Root>
                    <TextField.Input placeholder="Email"  />
                </TextField.Root>
                

                <Text as="div">
                    Has multiple structures
                </Text>
                <Select.Root defaultValue="optionOne" >
                    <Select.Trigger />
                    <Select.Content position="popper">
                        <Select.Item value="optionOne">One structure</Select.Item>
                        <Select.Item value="optionTwo">Multiple structures</Select.Item>
                    </Select.Content>
                </Select.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Address" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Date of Loss" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Date Claim Created" />
                </TextField.Root>

                <Text as="div" size="2" mb="1" >
                    Policyholder Details
                </Text>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Name" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Email" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Phone Number" />
                </TextField.Root>

                <Text as="div" size="2" mb="1" >
                    More Info
                </Text>

                <TextField.Root>
                    <TextField.Input placeholder="Insurance Company" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Agent/Broker" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Project Manager" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Adjuster" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policy Number" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Type of loss - will dropdown" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="CAT Code" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Emergency Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Repair Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Contents Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Default Depreciation" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Max Depreciation" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Sales Tax" />
                </TextField.Root>

            
                
        </div>
        <br/>
        <h1>Document</h1>
        <Text>show document here</Text>
        <Button>Generate pdf</Button>



        <br/>
        <h1>Hydro, place here or add link, or add option to navbar</h1>

    </div>


    
  )
}

export default viewContactPage