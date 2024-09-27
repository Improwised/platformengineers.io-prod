__NUXT_JSONP__("/blog/securing-kubernetes-beyond-rbac-and-pod-security-policies-psp", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){return {data:[{blog:{id:b,status:"published",sort:20,date_created:"2024-06-17T11:51:36.151Z",date_updated:"2024-06-17T12:23:43.029Z",slug:"securing-kubernetes-beyond-rbac-and-pod-security-policies-psp",title:g,description:"\u003Cp dir=\"ltr\"\u003ERole-Based Access Control (RBAC) and Pod Security Policies (PSP) are essential components of Kubernetes security, they are not enough to provide comprehensive protection against threats. Let&rsquo;s explore advanced techniques for securing Kubernetes beyond RBAC and PSP.\u003C\u002Fp\u003E",seo_title:g,seo_description:"Role-Based Access Control (RBAC) and Pod Security Policies (PSP) are essential components of Kubernetes security, they are not enough to provide comprehensive protection against threats. Let’s explore advanced techniques for securing Kubernetes beyond RBAC and PSP.\n",content:"\u003Cp dir=\"ltr\"\u003EAs more organizations adopt Kubernetes to manage their containerized workloads, securing Kubernetes clusters has become a top priority. While Role-Based Access Control (RBAC) and Pod Security Policies (PSP) are essential components of Kubernetes security, they are not enough to provide comprehensive protection against threats. Let’s explore advanced techniques for securing Kubernetes beyond RBAC and PSP.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ENetwork Policies\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ENetwork policies are a powerful feature of Kubernetes that provides fine-grained control over network traffic between pods. By default, all pods in a Kubernetes cluster can communicate with each other, which can create security risks. Network policies allow you to define rules that restrict network traffic based on labels, IP addresses, and ports.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of a network policy that allows traffic only between pods with the label \"app: my-app\" and denies all other traffic:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003EapiVersion: networking.k8s.io\u002Fv1\nkind: NetworkPolicy\nmetadata:\n name: allow-my-app\nspec:\n podSelector:\n   matchLabels:\n     app: my-app\n policyTypes:\n - Ingress\n ingress:\n - from:\n   - podSelector:\n       matchLabels:\n         app: my-app\n   ports:\n   - protocol: TCP\n     port: 80\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis network policy uses the \"podSelector\" field to select pods with the label \"app: my-app\" and allows incoming traffic only from those pods on port 80.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EAdmission Controllers\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EAdmission controllers are plugins that intercept requests to the Kubernetes API server and enforce policies before allowing or denying the request. Admission controllers can be used to enforce a wide range of policies, including resource quotas, image validation, and pod security policies.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of an admission controller that enforces a policy that requires all containers to run as a non-root user:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003EapiVersion: admissionregistration.k8s.io\u002Fv1\nkind: MutatingWebhookConfiguration\nmetadata:\n name: run-as-non-root\nWebhooks:\n- admissionReviewVersions:\n  - v1\n  name: run-as-non-root.example.com\n  rules:\n  - apiGroups: [“”]\n    apiVersions: [“v1”]\n    operations: [“CREATE”]\n    resources: [“pods”]\n    failurePolicy: Fail\n    clientConfig:\n\tservice:\n\t  name: run-as-non-root-webhook\n\t  namespace: kube-system\n\t  Path: “\u002Fmutate”\n     caBundle: ${CA_BUNDLE}\n  sideEffects: None\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis admission controller uses a mutating webhook to modify the pod specification and set the \"runAsUser\" field to a non-root user. The \"failurePolicy\" field is set to \"Fail\" to ensure that the pod is not created if the webhook fails.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ESecurity Contexts\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ESecurity contexts allow you to define security settings for a pod or container. Security contexts can be used to set privileges, capabilities, and SELinux contexts for containers.&nbsp;\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of a security context that sets the \"runAsUser\" field to 1000 and the \"runAsGroup\" field to 3000:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003EapiVersion: v1\nkind: Pod\nmetadata:\n name: my-pod\nspec:\n  containers:\n  - image: ubuntu\n    command:\n      - \"sleep\"\n      - \"604800\"\n    imagePullPolicy: IfNotPresent\n    name: ubuntu\n    securityContext:\n      runAsUser: 1000\n      runAsGroup: 3000\n  restartPolicy: Always\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis security context sets the \"runAsUser\" field to 1000 and the \"runAsGroup\" field to 3000, ensuring that the container runs with the specified user and group IDs.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EPod Security Standards\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EPod security standards are a set of guidelines for configuring pod security policies. Pod security standards define a set of baseline requirements for pod security, including requirements for container images, network policies, and security contexts.&nbsp;\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of a pod security standard that requires all containers to run as a non-root user and use a read-only root file system:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003EapiVersion: policy\u002Fv1beta1\nkind: PodSecurityPolicy\nmetadata:\n name: restricted\nspec:\n privileged: false\n allowPrivilegeEscalation: false\n requiredDropCapabilities:\n - ALL\n allowedCapabilities: []\n volumes:\n - 'configMap'\n - 'emptyDir'\n - 'projected'\n - 'secret'\n - 'downwardAPI'\n runAsUser:\n   rule: 'MustRunAsNonRoot'\n fsGroup:\n   rule: 'MustRunAs'\n   ranges:\n   - min: 1\n     max: 65535\n seLinux:\n   rule: 'RunAsAny'\n supplementalGroups:\n   rule: 'MustRunAs'\n   ranges:\n   - min: 1\n     max: 65535\n readOnlyRootFilesystem: true\n hostNetwork: false\n hostPorts: false\n hostPID: false\n hostIpc: false\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis pod security standard requires all containers to run as a non-root user, use a read-only root filesystem, and disables privileged mode. It also restricts access to host networking, host ports, host PIDs, and host IPC.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EImage Scanning\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EContainer images often contain vulnerabilities that can be exploited by attackers. Image scanning tools can help identify known vulnerabilities in container images and alert you to potential security issues. Kubernetes provides built-in support for image scanning through its Container Runtime Interface (CRI). You can configure CRI to scan images automatically when they are pushed to a registry or manually trigger scans using command-line tools.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of how to manually trigger a scan of a container image using \u003Ca href=\"https:\u002F\u002Fengine.anchore.io\u002Fdocs\u002Finstall\u002Fanchore_cli\u002F\"\u003EAnchore Engine\u003C\u002Fa\u003E, an open-source image scanning tool:\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EInstall Anchore Engine in your environment.\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" style=\"font-weight: bold;\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003ECreate a new analysis: \u003C\u002Fstrong\u003E\u003Ccode\u003E$ anchore-cli image add --name \u003Cregistry\u003E\u002F\u003Cimage\u003E:\u003Ctag\u003E\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Col\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EWait for the analysis to complete.\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" style=\"font-weight: bold;\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003E\u003Cstrong\u003EView the results: \u003C\u002Fstrong\u003E\u003Ccode\u003E$ anchore-cli image analyze \u003Cregistry\u003E\u002F\u003Cimage\u003E:\u003Ctag\u003E\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003E\u003Cstrong\u003E&nbsp;\u003C\u002Fstrong\u003EThe output will include information about any vulnerabilities found in the image and recommendations for remediation.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ESeccomp Profiles\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ESeccomp profiles limit the syscalls that a container can make, reducing the risk of container breakouts and privilege escalations. Seccomp profiles can be applied to individual containers or entire pods. Kubernetes supports two types of Seccomp profiles: strict and runtime. Strict profiles deny all syscalls except for a whitelist of approved syscalls, while runtime profiles allow all syscalls by default and require explicit denials.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of how to apply a Seccomp profile to a container:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003ECreate a Seccomp profile:\n{\n   \"defaultAction\": \"SCMP_ACT_ERRNO\",\n   \"syscalls\": [\n       {\n           \"names\": [\"open\"],\n           \"action\": \"SCMP_ACT_ALLOW\",\n           \"args\": []\n       },\n       \u002F\u002F Add more syscall rules here\n   ]\n}\nSave the profile to a file, such as my-profile.json.\nApply the profile to a container:\napiVersion: v1\nkind: Pod\nmetadata:\n name: audit-pod\n labels:\n   app: audit-pod\nspec:\n securityContext:\n   seccompProfile:\n     type: Localhost\n     localhostProfile: \u002Fpath\u002Fto\u002Fmy-profile.json\n containers:\n - name: test-container\n   image: hashicorp\u002Fhttp-echo:1.0\n   args:\n   - \"-text=just made some syscalls!\"\n   securityContext:\n     allowPrivilegeEscalation: false\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis security context applies the Seccomp profile specified in my-profile.json to the container.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ESecrets Management\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EAnother critical aspect of securing Kubernetes clusters is secrets management. Secrets such as passwords, tokens, and certificates must be stored securely and accessed only by authorized components. Kubernetes provides several ways to manage secrets, including storing them as environment variables, config maps, or secret objects. Secret objects are recommended because they provide encryption at rest and in transit, access control, and fine-grained permissions.&nbsp;\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of creating a secret object containing a database password:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Ekubectl create secret generic db-secret --from-literal=password=mysecretpassword\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EOnce created, secrets can be mounted as files within pods or accessed directly via environment variables. Access control can be implemented using RBAC rules, denying access to unauthorized users.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ERuntime Security\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EFinally, runtime security is essential for detecting and preventing attacks against your cluster. Runtime security tools such as container runtimes, Kubernetes admission controllers, and service meshes can monitor and enforce policies at runtime. Container runtimes such as Docker, containerd, and cri-o provide runtime isolation, resource limits, and network policies for each container. They can also detect and prevent attacks such as container escapes, privilege escalations, and malicious processes. Here's an example of setting up runtime security using Docker:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Eyaml{\n   \"security\": {\n       \"apparmor\": {\n           \"profile\": \"unconfined\"\n       },\n       \"selinux\": {\n           \"enabled\": false\n       }\n   }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EWe disable SELinux and set AppArmor to unconfined mode, providing maximum flexibility for our containers. However, you may want to restrict these settings further based on your security requirements.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EService meshes&nbsp;\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EService meshes are another option for runtime security. Service meshes provide features such as traffic management, observability, and security for microservices architectures. Service meshes typically operate at the network layer, injecting proxies into each pod to manage traffic flow and enforce security policies.&nbsp;\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EHere's an example of setting up a service mesh using Istio:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003EapiVersion: networking.istio.io\u002Fv1alpha3\nkind: VirtualService\nmetadata:\n name: myservice\nspec:\n hosts:\n   - myservice.default.svc.cluster.local\n http:\n   - match:\n       - headers:\n           host:\n             exact: myservice.example.com\n     route:\n       - destination:\n           host: myservice.default.svc.cluster.local\n           port:\n             number: 80\n         weight: 100\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EWe define a virtual service called myservice that routes incoming requests to our backend service based on HTTP headers. We specify the hostname of our frontend service and the backend service to route requests to.Conclusion:Securing Kubernetes clusters requires advanced techniques beyond RBAC and Pod Security Policies. Network security, secrets management, and runtime security are critical aspects of securing Kubernetes clusters. Using network policies, secret objects, container runtimes, admission controllers, and service meshes, you can enforce fine-grained policies, detect and prevent attacks, and monitor your cluster's health.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EConclusion\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ESecuring Kubernetes clusters requires a multi-layered approach that goes beyond RBAC and Pod Security Policies. Network policies, admission controllers, security contexts, pod security standards, image scanning, and Seccomp profiles are advanced techniques that can help you secure your Kubernetes clusters and protect against threats. By implementing these techniques, you can ensure that your Kubernetes clusters are secure and compliant with industry best practices.&nbsp;\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong id=\"docs-internal-guid-99160d5c-7fff-ce92-3b99-ae25845f7306\"\u003ERemember: Security is an ongoing process. Regularly review and update your security practices to adapt to evolving threats and maintain a robust security posture for your Kubernetes deployments.\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E",tags:a,time_to_read:"5 mins",user_created:{id:c,first_name:d,last_name:e,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:f,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},user_updated:{id:c,first_name:d,last_name:e,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:f,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},image:{id:"97e4ca74-ff1d-4859-8948-bf0f7152f44a",storage:"AMZ",filename_disk:"97e4ca74-ff1d-4859-8948-bf0f7152f44a.png",filename_download:"virtual-machines-operating-system-data-storage-min.png",title:"Virtual Machines Operating System Data Storage Min",type:"image\u002Fpng",folder:"33b4de25-d0f2-4999-ba32-6883f9932c34",uploaded_by:c,created_on:q,modified_by:a,modified_on:"2024-06-17T11:46:19.670Z",charset:a,filesize:"491660",width:2000,height:1333,duration:a,embed:a,description:a,location:a,tags:a,metadata:{},focal_point_x:a,focal_point_y:a,tus_id:a,tus_data:a,uploaded_on:q},authors:[{id:28,pe_blog_id:b,directus_users_id:{first_name:d,last_name:e,avatar:f}},{id:29,pe_blog_id:b,directus_users_id:{first_name:"Satish",last_name:"Annavar ",avatar:"33d28adb-eb7a-47f1-adc1-2233c7f06711"}}]},_img:{"/_ipx/f_png/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002Fe7b705.png","/_ipx/f_png,s_68x55/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002F418082.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/20d037d1-41ee-4efd-b034-1350a3ce336d":"\u002F_nuxt\u002Fimage\u002Fa07868.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/33d28adb-eb7a-47f1-adc1-2233c7f06711":"\u002F_nuxt\u002Fimage\u002F32d461.png","/_ipx/h_400,f_png/https://data.improwised.com/assets/97e4ca74-ff1d-4859-8948-bf0f7152f44a":"\u002F_nuxt\u002Fimage\u002Ff31ebf.png","/_ipx/f_png,h_400/https://data.improwised.com/assets/97e4ca74-ff1d-4859-8948-bf0f7152f44a":"\u002F_nuxt\u002Fimage\u002F68a8c5.png"}}],fetch:{},mutations:[]}}(null,22,"f6ae4b64-c3c4-4f35-8b41-9f48088de4b1","Angita","Shah","20d037d1-41ee-4efd-b034-1350a3ce336d","Securing Kubernetes: Beyond RBAC and Pod Security Policies (PSP)","angita.shah@improwised.com","**********","SEO Specialist","active","5ef170ac-f2e9-4b93-a9ea-5c54fcf0fa40","2024-09-20T10:17:43.182Z","\u002Fcontent\u002Fteam","default",true,"2024-06-17T11:46:18.871Z")));