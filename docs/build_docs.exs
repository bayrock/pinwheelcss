directory = "layouts"
layouts = directory |> File.ls!
pattern = ~r/{(\w+)}/

for file <- layouts do
    layout = "#{directory}/#{file}" |> File.read!
    inserts = pattern |> Regex.scan(layout)

    for [block, name] <- inserts do
        partial = "partials/#{name}.md" |> File.read!
        document = layout |> String.replace(block, partial)
        "../#{file}" |> String.replace(".layout", "") |> File.write!(document)
    end
end

doccount = length(layouts)
"Successfully built #{doccount} document file#{if doccount > 1 do "s" else "" end}!" |> IO.puts
