// const [ testData, setTestData ] = useState('');
//   // const [ fetchData, { data, loading, error } ] = useLazyQuery(NewQuery)
//   const fetchData = async() => { 
//     const res = await client.query({ query: NewQuery })
//     // setTestData(JSON.stringify(res?.data?.posts?.nodes, null, 2))
//     const contentArray = res?.data?.posts?.nodes.map((post) => ({ content: post.content.replace(/<[^>]+>/g, (match) => {
//       // Replace each tag with an empty tag (no attributes)
//       return `<${match.split(' ')[0]}>`;
//     }) }));
//     setTestData(JSON.stringify(contentArray, null, 2));
//   } 

//   useEffect(() => {
//     fetchData();
//   }, [])