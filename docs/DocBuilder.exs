defmodule DocBuilder do
    @doc """
    - Reads .layout(.md) files from directory
    - Replaces pattern with corresponding partials
    - Writes full documents to the root directory

    Returns `{:ok, msg}` for success or `{:error, msg}` for failure
    """
    def buildall(ext \\ ".md") do
        directory = "./layouts" # The directory to read layouts from
        root = "../" # The directory to write documents to
        pattern = ~r/{(\w+)}/ # The regex pattern to replace
        layouts = directory |> File.ls! # List of layouts
        
        for file <- layouts do
            layout = "#{directory}/#{file}" |> File.read!
            includes = pattern |> Regex.scan(layout)

            for [block, name] <- includes do
                partial = "partials/#{name}#{ext}" |> File.read!
                document = layout |> String.replace(block, partial)
                 "#{root}#{file}" |> String.replace(".layout", "") |> File.write!(document)
            end
        end

        if (doc_count = length(layouts)) > 0 do
            {:ok, "Successfully built #{doc_count} document file#{if doc_count > 1 do "s" else "" end}!"}
        else
            {:error, "No layouts found in #{directory} directory!"}
        end
    end
end

case DocBuilder.buildall do
    {:ok, msg} -> msg |> IO.puts
    {:error, msg} -> "Error running DocBuilder:\n#{msg}" |> IO.puts
end
