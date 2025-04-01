import { Card } from "./card";

export default function Container( { content, loading, error }: { content, loading, error }){
    return  <div className="flex flex-wrap space-x-4 pt-4 sm:space-x-0 sm:space-y-4 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      content.map(({ type, title, link }) => (
        <Card key={title} type={type} link={link} title={title} />
      ))
    )}
  </div>
}