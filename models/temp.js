const mongoose=require("mongoose");
require('./faculty');


mongoose.connect("mongodb://brad:Yahoo123_@ds031203.mlab.com:31203/vidjot-prod", {

    useNewUrlParser:true
})
const Faculty = mongoose.model('faculties');
    let igdtuFaculties=[
        {
            name: "Dr.Mohona Ghosh",
            email:"mohonaghosh@igdtuw.ac.in",
            subject_name:"Cryptography protocols and algorithm",
            subject_id:"MIS-502"
        },
        {
            name: "Dr.Arun Sharma ",
            email: "arunsharma@igdtuw.ac.in",
            subject_name: "Big Data and Analysis",
            subject_id:"MIS-514"

        },
        {
            name: "Prof.R.K Singh",
            email:"rksingh@igdtuw.ac.in",
            subject_name: "Software testing and Risk Management",
            subject_id:"MIS-000"

        },
        {
            name: "Mr.Gaurav Indra",
            email:"gaurav.indra.dtu@gmail.com",
            subject_name: "Cloud Computing and Analysis",
            subject_id:"MIS-506"

        },
        {
            name: "Ms. Neha Bansal",
            email:"nehabansal33@gmail.com",
            subject_name: "Operating System Hardening ",
            subject_id:"MIS-504"

        }
    ];

    for(let i=0;i<igdtuFaculties.length;i++)
    {

        let igdtuFaculties1=new Faculty({
            name:igdtuFaculties[i].name,
            email:igdtuFaculties[i].email,
            subject_id:igdtuFaculties[i].subject_id,
            subject_name:igdtuFaculties[i].subject_name
        });
        try{
            console.log(i);
        igdtuFaculties1.save()
            .then(()=>{
                console.log("saved");
            })
            .catch(err=>{
                console.log(err);
            })


        }
        catch (e) {
            console.log(e);

        }

    }

