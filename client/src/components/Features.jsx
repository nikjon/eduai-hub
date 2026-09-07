import FeatureCard from "./Featurecard";

export default function Features() {

const data=[

{
icon:"🤖",
title:"AI Tutor",
description:"Ask anything from AI."
},

{
icon:"📚",
title:"Smart Notes",
description:"Generate Notes instantly."
},

{
icon:"📝",
title:"Quiz",
description:"Unlimited Practice Tests."
},

{
icon:"📅",
title:"Study Planner",
description:"Daily study roadmap."
},

{
icon:"📄",
title:"PYQ",
description:"Previous Year Papers."
},

{
icon:"📈",
title:"Progress",
description:"Track your preparation."
}

];

return(

<section className="py-24 px-10 bg-slate-950">

<h1 className="text-center text-5xl font-bold mb-16">

Why EduAI Hub?

</h1>

<div className="grid md:grid-cols-3 gap-8">

{

data.map((item,index)=>(

<FeatureCard
key={index}
icon={item.icon}
title={item.title}
description={item.description}
/>

))
}
</div>
</section>
);
}