
const testRecentWorks = [
    {
        name: "Mamad",
        repoURL: "hsef",
        imageName: "main.png",
        category: "Android",
    },{
        name: "Mamad",
        repoURL: "hsef",
        imageName: "main.png",
        category: "Other",
    },{
        name: "Mamad",
        repoURL: "hsef",
        imageName: "main.png",
        category: "Back End",
    },
]

const testTestimonial = [
    {
        imageName: "main.png",
        name: "ConKash",
        des:"Matin Is E Good Guy!"
    },
    {
        imageName: "main.png",
        name: "ConKash",
        des:"Matin Is E Good Guy!"
    },
    {
        imageName: "main.png",
        name: "ConKash",
        des:"Matin Is E Good Guy!"
    },
    {
        imageName: "main.png",
        name: "ConKash",
        des:"Matin Is E Good Guy!"
    },
]
async function holdJSON(data,githubREPO){
    return {

        "github": data.github,
        "instagram": data.instagram,
        "linkedin": data.linkedin,
        "telegram":data.telegram,
        "projects": githubREPO.length,
        "aboutDes":data.aboutDes,
        "email":data.email,
        "number":data.number,
        "skillsData": data.skillData,
        "offers": data.offers,
        "recentWorks": testRecentWorks,// Nemone Ha!
        "testimonial": testTestimonial // Moarefia!
    
    }
}
module.exports = {
    holdJSON,
}