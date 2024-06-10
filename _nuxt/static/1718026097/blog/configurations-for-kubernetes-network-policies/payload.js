__NUXT_JSONP__("/blog/configurations-for-kubernetes-network-policies", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){return {data:[{blog:{id:b,status:"published",sort:14,date_created:"2024-04-04T06:24:20.635Z",date_updated:"2024-06-10T07:37:51.233Z",slug:"configurations-for-kubernetes-network-policies",title:g,description:"\u003Cp dir=\"ltr\"\u003ENetwork Policies (NPs) in Kubernetes provide a granular security mechanism for controlling inbound and outbound&nbsp; traffic to pods. While basic network policies offer essential functionality, complex deployments often necessitate more sophisticated configurations. This blog post delves into advanced Network Policy features, enabling you to create robust and secure communication channels within your Kubernetes clusters.\u003C\u002Fp\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E",seo_title:g,seo_description:"Implement granular network access controls, manage egress traffic, and leverage network policy features for robust security within your Kubernetes clusters",content:"\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ETesting Setup\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EIn this testing setup, we have a Kubernetes cluster running on the lightweight Kubernetes distribution called \u003Ca href=\"https:\u002F\u002Franchermanager.docs.rancher.com\u002Fhow-to-guides\u002Fnew-user-guides\u002Fkubernetes-cluster-setup\u002Fk3s-for-rancher\" target=\"_blank\" rel=\"noopener\"\u003ERancher K3s\u003C\u002Fa\u003E (version v1.29.3+k3s1). This version of K3s provides a minimalistic approach to deploying and managing a Kubernetes cluster with a focus on simplicity and resource efficiency. It supports both ARM64 and x86 architectures, making it suitable for various hardware platforms.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EThe Container Network Interface \u003Ca href=\"https:\u002F\u002Fkubernetes.io\u002Fdocs\u002Fconcepts\u002Fextend-kubernetes\u002Fcompute-storage-net\u002Fnetwork-plugins\u002F\" target=\"_blank\" rel=\"noopener\"\u003E(CNI) plugin\u003C\u002Fa\u003E being used in this setup is \u003Ca href=\"https:\u002F\u002Fwww.tigera.io\u002Fproject-calico\u002F\" target=\"_blank\" rel=\"noopener\"\u003ECalico\u003C\u002Fa\u003E (version v3.27.3), which is a popular open-source networking solution for Kubernetes clusters. Calico offers features like network policy management, IP address management, and BGP routing. By integrating Calico with K3s, we can leverage its advanced networking capabilities while maintaining the lightweight nature of K3s.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003ENetwork policies support in different CNI\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003E\u003Ca href=\"https:\u002F\u002Fkubernetes.io\u002Fdocs\u002Fconcepts\u002Fservices-networking\u002Fnetwork-policies\u002F\" target=\"_blank\" rel=\"noopener\"\u003ENetwork policies\u003C\u002Fa\u003E are supported in various types of Container Network Interface (CNI) plugins, including self-hosted, Amazon EKS, Google Cloud Platform (GCP), and others. Here's a breakdown of the support for network policies in each type:\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003E\u003Cstrong\u003ESelf-Hosted: \u003C\u002Fstrong\u003ESelf-hosted CNI plugin support for network policies depends on the specific plugin being used. It is essential to check the documentation of the chosen CNI plugin to ensure it supports network policies.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EAmazon EKS:\u003C\u002Fstrong\u003E In Amazon EKS, the \u003Ca href=\"https:\u002F\u002Fdocs.aws.amazon.com\u002Feks\u002Flatest\u002Fuserguide\u002Fmanaging-vpc-cni.html\" target=\"_blank\" rel=\"noopener\"\u003EAmazon VPC CNI plugin\u003C\u002Fa\u003E supports network policies starting from version 1.14 or later. This integration allows users to control all in-cluster communication, including IP addresses, ports, and connections between pods.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EGoogle Cloud Platform (GCP): \u003C\u002Fstrong\u003EGoogle Cloud Platform does not explicitly mention support for network policies in their CNI plugin documentation. However, since Kubernetes supports network policies natively, it can be assumed that \u003Ca href=\"https:\u002F\u002Fwww.googlecloudcommunity.com\u002Fgc\u002FGoogle-Kubernetes-Engine-GKE\u002FWhat-CNI-plugin-is-used-in-GKE-and-are-there-alternatives\u002Fm-p\u002F671169\" target=\"_blank\" rel=\"noopener\"\u003EGCP's CNI plugin\u003C\u002Fa\u003E would also support network policies indirectly.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EOthers: \u003C\u002Fstrong\u003EFor other CNI plugins like \u003Ca href=\"https:\u002F\u002Fdocs.tigera.io\u002Fcalico\u002Flatest\u002Fabout\u002F\" target=\"_blank\" rel=\"noopener\"\u003ECalico\u003C\u002Fa\u003E, \u003Ca href=\"https:\u002F\u002Fgcore.com\u002Flearning\u002Fconfigure-kubernetes-network-with-flannel\u002F\" target=\"_blank\" rel=\"noopener\"\u003EFlannel\u003C\u002Fa\u003E, \u003Ca href=\"https:\u002F\u002Fubuntu.com\u002Fkubernetes\u002Fdocs\u002Fcni-canal\" target=\"_blank\" rel=\"noopener\"\u003ECanal\u003C\u002Fa\u003E, and \u003Ca href=\"https:\u002F\u002Fkubernetes.io\u002Fdocs\u002Ftasks\u002Fadminister-cluster\u002Fnetwork-policy-provider\u002Fweave-network-policy\u002F\" target=\"_blank\" rel=\"noopener\"\u003EWeave Net,\u003C\u002Fa\u003E it is crucial to consult the respective documentation to understand their support for network policies. Each CNI plugin may have different approaches to implementing network policies, so understanding the specific implementation details is important.\u003C\u002Fp\u003E\n\u003Ch2 dir=\"ltr\"\u003EAdvanced Network Policy Capabilities\u003C\u002Fh2\u003E\n\u003Cp dir=\"ltr\"\u003ENetwork Policies (NPs) in Kubernetes provide a granular security mechanism for controlling inbound and outbound&nbsp; traffic to pods. While basic network policies offer essential functionality, complex deployments often necessitate more sophisticated configurations. This blog post delves into advanced Network Policy features, enabling you to create robust and secure communication channels within your Kubernetes clusters.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHaving grasped the fundamentals of NetworkPolicy resources, we can explore advanced configurations to achieve finer-grained control over network traffic. Here's a breakdown of key features:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EPod Selectors with Multiple Expressions:\u003C\u002Fstrong\u003E Network Policy selectors can encompass multiple expressions to precisely target specific pods or groups of pods. This allows for more granular control over which pods are subject to the policy's rules.\u003C\u002Fp\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode spellcheck=\"false\"\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n&nbsp;&nbsp;name: allow-db-access-on-service-port\nspec:\n&nbsp;&nbsp;podSelector:\n&nbsp;&nbsp;&nbsp;&nbsp;matchExpressions:\n&nbsp;&nbsp;&nbsp;&nbsp;- key: app\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;operator: In\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values:\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- webserver\n&nbsp;&nbsp;ingress:\n&nbsp;&nbsp;- from:\n&nbsp;&nbsp;&nbsp;&nbsp;- podSelector: {}\n&nbsp;&nbsp;&nbsp;&nbsp;ports:\n&nbsp;&nbsp;&nbsp;&nbsp;- protocol: TCP\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port: 80\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EIn the example above, the Network Policy only applies to pods with labels app: database and tier: backend.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003ENamespace Selectors: \u003C\u002Fstrong\u003ENetwork Policies can be scoped to specific namespaces, restricting traffic flow within those namespaces.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode spellcheck=\"false\"\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n&nbsp;&nbsp;name: restrict-web-ingress\nspec:\n&nbsp;&nbsp;podSelector: {}\n&nbsp;&nbsp;ingress:\n&nbsp;&nbsp;- from:\n&nbsp;&nbsp;&nbsp;&nbsp;- namespaceSelector:\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels:\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubernetes.io\u002Fmetadata.name: frontend\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EHere, the Network Policy allows ingress traffic only from pods within the frontend namespace.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EIngress from Specific Ports: \u003C\u002Fstrong\u003ENetwork Policies can restrict traffic by specifying allowed \u003Ca href=\"https:\u002F\u002Fkubernetes.io\u002Fdocs\u002Fconcepts\u002Fservices-networking\u002Fingress\u002F\" target=\"_blank\" rel=\"noopener\"\u003Eingress ports\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n  name: allow-db-access-on-service-port\nspec:\n  podSelector:\n    matchExpressions:\n    - key: app\n      operator: In\n      values:\n      - webserver\n  ingress:\n  - from:\n    - podSelector: {}\n    ports:\n    - protocol: TCP\n      port: 80\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis policy allows only TCP traffic on port 80 (HTTP) to reach pods with the label app: webserver.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EEgress to Specific IPs\u002FCIDRs:\u003C\u002Fstrong\u003E Similar to ingress, Network Policies can control outbound traffic by specifying allowed egress destinations using IP addresses or CIDR blocks.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-db-egress\nspec:\n  podSelector:\n    matchExpressions:\n    - key: app\n      operator: In\n      values:\n      - database\n  egress:\n  - to:\n    - podSelector: {}\n  - to:\n    - ipBlock:\n        cidr: 10.0.0.0\u002F16\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis policy allows the database pods to communicate with any pod within the cluster and restricts outbound traffic to the IP range 10.0.0.0\u002F16.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EProtocol Specificity: \u003C\u002Fstrong\u003ENetwork Policies can define allowed protocols (TCP, UDP, SCTP) for both ingress and egress traffic, offering granular control over the types of network communication permitted.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode spellcheck=\"false\"\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n  name: allow-dns-udp\nspec:\n  podSelector:\n    matchExpressions:\n    - key: app\n      operator: In\n      values:\n      - webserver\n  ingress:\n  - from:\n    - podSelector: {}\n    ports:\n    - protocol: UDP\n      port: 53\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThe policy above allows only UDP traffic on port 53 (DNS) to reach the webserver pods.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EApplication Ports: \u003C\u002Fstrong\u003ENetwork Policies can reference pod ports defined within a Service resource using the applicationPorts field. This simplifies policy creation and avoids hardcoding port numbers.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode spellcheck=\"false\"\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n  name: allow-http-ingress\nspec:\n  podSelector:\n    matchExpressions:\n    - key: app\n      operator: In\n      values:\n      - webserver\n  ingress:\n  - from:\n    - podSelector: {}\n    ports:\n    - protocol: TCP\n      port: 80\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EAdvanced Configurations\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003ECombining Ingress and Egress Rules:\u003C\u002Fstrong\u003E Network Policies allow combining ingress and egress rules within a single policy to define comprehensive communication restrictions for a set of pods.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cdiv class=\"code-block with-line-numbers\" data-language=\"yaml\"\u003E\n\u003Cpre\u003E\u003Ccode spellcheck=\"false\"\u003EYAML\napiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n name: restrict-db-communication\nspec:\n podSelector:\n   matchExpressions:\n   - key: app\n     operator: In\n     values:\n     - database\n ingress:\n - from:\n   - podSelector:\n       matchExpressions:\n       - key: app\n         operator: In\n         values:\n         - webserver\n egress:\n - to:\n   - podSelector: {}\n - to:\n   - ipBlock:\n       cidr: 192.168.0.0\u002F16\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis policy restricts the database pods to receive traffic only from webserver pods within the same cluster and allows them to communicate with any pod within the 192.168.0.0\u002F16 CIDR range.\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EUsing NetworkPolicy API Groups: \u003C\u002Fstrong\u003ENetwork Policies support multiple API groups, offering additional functionalities.&nbsp; The networking.k8s.io\u002Fv1 API group is the most commonly used, while newer versions might offer extended features.\u003Cbr\u003E\u003Cbr\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003ENetworkPolicy Resources in Workloads: \u003C\u002Fstrong\u003ENetwork Policy resources can be embedded within deployments or pod specifications, allowing for tighter integration with specific workloads. This approach is generally discouraged as it reduces reusability and maintainability of Network Policies.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 dir=\"ltr\"\u003E&nbsp;\u003C\u002Fh3\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EAdvanced Use Cases and Best Practices\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EHaving explored advanced configurations, let's delve into some practical use cases for Network Policies in complex deployments:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cem\u003EMicrosegmentation: \u003C\u002Fem\u003ENetwork Policies can be used to create micro segments within a cluster, isolating communication between specific services or groups of pods. This enhances security by limiting the attack surface and preventing lateral movement of threats within the cluster.\u003Cbr\u003E\u003Cbr\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cem\u003EDenying All Traffic by Default:\u003C\u002Fem\u003E&nbsp; A common best practice is to implement a \"deny-all-by-default\" approach using Network Policies. This policy initially blocks all traffic, and subsequent Network Policies explicitly allow necessary communication channels. This ensures a more secure baseline and minimizes the risk of unintended traffic flow.\u003Cbr\u003E\u003Cbr\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cem\u003ELimiting Egress Traffic: \u003C\u002Fem\u003ENetwork Policies can be used to restrict outbound traffic from pods to specific IP addresses or domains. This helps prevent data exfiltration and enforces communication with authorized external services only.\u003Cbr\u003E\u003Cbr\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 dir=\"ltr\"\u003EConclusion\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ENetwork Policies offer a powerful mechanism for securing communication channels within Kubernetes clusters. By using advanced configurations and best practices, you can create robust security policies that isolate workloads, restrict unnecessary traffic, and enhance the overall security posture of your Kubernetes deployments. Remember to carefully design your Network Policies to balance security requirements with application functionality and avoid overly restrictive policies that hinder communication needed for your applications to function.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E",tags:a,time_to_read:"5 minutes",user_created:{id:c,first_name:d,last_name:e,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:f,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},user_updated:{id:c,first_name:d,last_name:e,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:f,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},image:{id:"b962570e-21d3-4298-b6c9-eea9aefd4ace",storage:"AMZ",filename_disk:"b962570e-21d3-4298-b6c9-eea9aefd4ace.png",filename_download:"ad_config-removebg-preview.png",title:"Ad Config Removebg Preview",type:"image\u002Fpng",folder:"33b4de25-d0f2-4999-ba32-6883f9932c34",uploaded_by:c,uploaded_on:"2024-04-04T06:35:45.473Z",modified_by:a,modified_on:"2024-04-04T06:35:46.137Z",charset:a,filesize:"209951",width:q,height:q,duration:a,embed:a,description:a,location:a,tags:a,metadata:{},focal_point_x:a,focal_point_y:a},authors:[{id:2,pe_blog_id:b,directus_users_id:{first_name:d,last_name:e,avatar:f}},{id:3,pe_blog_id:b,directus_users_id:{first_name:"Satish",last_name:"Annavar ",avatar:"33d28adb-eb7a-47f1-adc1-2233c7f06711"}}]},_img:{"/_ipx/f_png/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002Fe7b705.png","/_ipx/f_png,s_68x55/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002F418082.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/20d037d1-41ee-4efd-b034-1350a3ce336d":"\u002F_nuxt\u002Fimage\u002Fa07868.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/33d28adb-eb7a-47f1-adc1-2233c7f06711":"\u002F_nuxt\u002Fimage\u002F32d461.png","/_ipx/h_400,f_png/https://data.improwised.com/assets/b962570e-21d3-4298-b6c9-eea9aefd4ace":"\u002F_nuxt\u002Fimage\u002Fc36ace.png","/_ipx/f_png,h_400/https://data.improwised.com/assets/b962570e-21d3-4298-b6c9-eea9aefd4ace":"\u002F_nuxt\u002Fimage\u002F1886c5.png"}}],fetch:{},mutations:[]}}(null,16,"f6ae4b64-c3c4-4f35-8b41-9f48088de4b1","Angita","Shah","20d037d1-41ee-4efd-b034-1350a3ce336d","Advanced Configurations for Kubernetes Network Policies","angita.shah@improwised.com","**********","SEO Specialist","active","5ef170ac-f2e9-4b93-a9ea-5c54fcf0fa40","2024-06-10T13:26:53.380Z","\u002Fcontent\u002Fpe_blog","default",true,500)));