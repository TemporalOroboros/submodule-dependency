export interface SubmoduleDependency {
  depUser : string,
  depRepo : string,
  depPR : string,
}

export function get_submodule_dependencies(text : string) : SubmoduleDependency[] {
  const submodule_dependency_pattern
    = /(requires|depends on) \[{0,1}(?<urlPrefix>https:\/\/github\.com\/){0,1}(?<depUser>[a-zA-Z0-9_-]+)\/(?<depRepo>[a-zA-Z0-9_-]+)(?:#|\/pull\/)(?<depPR>[0-9]+)\]{0,1}/ig;

  var results : SubmoduleDependency[] = [];

  // By using the global flag (g), we can search repeatedly by running `exec`
  // multiple times
  var match;

  while ((match = submodule_dependency_pattern.exec(text)) != null && match.groups != undefined) {
    results.push({
      depUser: match.groups["depUser"],
      depRepo: match.groups["depRepo"],
      depPR: match.groups["depPR"],
    });
  }

  return results;
}
