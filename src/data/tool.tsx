export type OS = "windows" | "macos" | "linux";
export type WindowsPkg = "choco" | "winget" | "scoop";
export type MacPkg = "homebrew";
export type LinuxPkg = "apt" | "dnf" | "pacman";
export type PkgManager = WindowsPkg | MacPkg | LinuxPkg;

export interface Tool {
  name: string;
  iconsrc: string;
  install: Partial<Record<PkgManager, string>>;
}

export interface ToolCategory {
  category: string;
  tools: Tool[];
}
const toolsData: ToolCategory[] = [
  {
    category: "Programming Languages",
    tools: [
      {
        name: "C",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
        install: {
          apt: "sudo apt install build-essential -y",
          choco: "choco install mingw",
          homebrew: "brew install gcc"
        }
      },
      {
        name: "C++",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
        install: {
          apt: "sudo apt install g++ -y",
          choco: "choco install mingw",
          homebrew: "brew install gcc"
        }
      },
      {
        name: "C#",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
        install: {
          apt: "sudo apt install mono-complete -y",
          choco: "choco install dotnet",
          homebrew: "brew install --cask dotnet-sdk"
        }
      },
      {
        name: "Go",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
        install: {
          apt: "sudo apt install golang -y",
          choco: "choco install golang",
          homebrew: "brew install go"
        }
      },
      {
        name: "Java",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        install: {
          apt: "sudo apt install default-jdk -y",
          choco: "choco install openjdk",
          homebrew: "brew install openjdk"
        }
      },
      {
        name: "JavaScript",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        install: {
          apt: "sudo apt install nodejs -y",
          choco: "choco install nodejs",
          homebrew: "brew install node"
        }
      },
      {
        name: "TypeScript",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
        install: {
          apt: "sudo apt install npm -y && sudo npm install -g typescript",
          choco: "choco install typescript",
          homebrew: "brew install typescript"
        }
      },
      {
        name: "PHP",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
        install: {
          apt: "sudo apt install php -y",
          choco: "choco install php",
          homebrew: "brew install php"
        }
      },
      {
        name: "Perl",
        iconsrc: "https://api.iconify.design/logos-perl.svg",
        install: {
          apt: "sudo apt install perl -y",
          choco: "choco install strawberryperl",
          homebrew: "brew install perl"
        }
      },
      {
        name: "Ruby",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg",
        install: {
          apt: "sudo apt install ruby-full -y",
          choco: "choco install ruby",
          homebrew: "brew install ruby"
        }
      },
      {
        name: "Scala",
        iconsrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/scala/scala-original.svg",
        install: {
          apt: "sudo apt install scala -y",
          choco: "choco install scala",
          homebrew: "brew install scala"
        }
      },
      {
        name: "Python",
        iconsrc: "/icons/python.svg",
        install: {
          apt: "sudo apt install python3 -y",
          choco: "choco install python",
          homebrew: "brew install python"
        }
      },
      {
        name: "Rust",
        iconsrc: "/icons/rust.svg",
        install: {
          apt: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
          choco: "choco install rustup.install",
          homebrew: "brew install rust"
        }
      },
      {
        name: "Swift",
        iconsrc: "/icons/swift.svg",
        install: {
          apt: "sudo apt install swift -y",
          choco: "choco install swift",
          homebrew: "brew install swift"
        }
      },
      {
        name: "Kotlin",
        iconsrc: "/icons/kotlin.svg",
        install: {
          apt: "sudo snap install kotlin --classic",
          choco: "choco install kotlin",
          homebrew: "brew install kotlin"
        }
      },
      {
        name: "Dart",
        iconsrc: "/icons/dart.svg",
        install: {
          apt: "sudo apt install apt-transport-https && sudo sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -' && sudo sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list' && sudo apt update && sudo apt install dart",
          choco: "choco install dart-sdk",
          homebrew: "brew tap dart-lang/dart && brew install dart"
        }
      },
      {
        name: "Haskell",
        iconsrc: "/icons/haskell.svg",
        install: {
          apt: "sudo apt install haskell-platform -y",
          choco: "choco install haskell-stack",
          homebrew: "brew install haskell-stack"
        }
      },
      {
        name: "Clojure",
        iconsrc: "/icons/clojure.svg",
        install: {
          apt: "sudo apt install clojure -y",
          choco: "choco install clojure",
          homebrew: "brew install clojure/tools/clojure"
        }
      },
      {
        name: "Objective-C",
        iconsrc: "/icons/objectivec.svg",
        install: {
          apt: "sudo apt install gobjc -y",
          choco: "choco install gnustep",
          homebrew: "brew install gcc"
        }
      },
      {
        name: "Elixir",
        iconsrc: "/icons/elixir.svg",
        install: {
          apt: "sudo apt install elixir -y",
          choco: "choco install elixir",
          homebrew: "brew install elixir"
        }
      },
      {
        name: "Erlang",
        iconsrc: "/icons/erlang.svg",
        install: {
          apt: "sudo apt install erlang -y",
          choco: "choco install erlang",
          homebrew: "brew install erlang"
        }
      },
      {
        name: "Nim",
        iconsrc: "/icons/nim.svg",
        install: {
          apt: "curl https://nim-lang.org/choosenim/init.sh -sSf | sh",
          choco: "choco install nim",
          homebrew: "brew install nim"
        }
      },
    ]
  },
  
    {
      category: "Dev Tools",
      tools: [
        {
          name: "Git",
          iconsrc: "/icons/git.svg",
          install: {
            apt: "sudo apt install git -y",
            choco: "choco install git",
            homebrew: "brew install git"
          }
        },
        {
          name: "Docker",
          iconsrc: "/icons/docker.svg",
          install: {
            apt: "sudo apt install docker.io -y",
            choco: "choco install docker-desktop",
            homebrew: "brew install --cask docker"
          }
        },
        {
          name: "VS Code",
          iconsrc: "/icons/vscode.svg",
          install: {
            apt: "sudo snap install code --classic",
            choco: "choco install vscode",
            homebrew: "brew install --cask visual-studio-code"
          }
        },
        {
          name: "Vim",
          iconsrc: "/icons/vim.svg",
          install: {
            apt: "sudo apt install vim -y",
            choco: "choco install vim",
            homebrew: "brew install vim"
          }
        }
      ]
    },
    {
      category: "Databases",
      tools: [
        {
          name: "MySQL",
          iconsrc: "/icons/mysql.svg",
          install: {
            apt: "sudo apt install mysql-server -y",
            choco: "choco install mysql",
            homebrew: "brew install mysql"
          }
        },
        {
          name: "PostgreSQL",
          iconsrc: "/icons/postgresql.svg",
          install: {
            apt: "sudo apt install postgresql -y",
            choco: "choco install postgresql",
            homebrew: "brew install postgresql"
          }
        },
        {
          name: "MongoDB",
          iconsrc: "/icons/mongodb.svg",
          install: {
            apt: "sudo apt install mongodb -y",
            choco: "choco install mongodb",
            homebrew: "brew tap mongodb/brew && brew install mongodb-community"
          }
        },
        {
          name: "Redis",
          iconsrc: "/icons/redis.svg",
          install: {
            apt: "sudo apt install redis-server -y",
            choco: "choco install redis-64",
            homebrew: "brew install redis"
          }
        },
        {
          name: "SQLite",
          iconsrc: "/icons/sqlite.svg",
          install: {
            apt: "sudo apt install sqlite3 -y",
            choco: "choco install sqlite",
            homebrew: "brew install sqlite"
          }
        }
      ]
    },
    {
      category: "Web Servers",
      tools: [
        {
          name: "nginx",
          iconsrc: "/icons/nginx.svg",
          install: {
            apt: "sudo apt install nginx -y",
            choco: "choco install nginx",
            homebrew: "brew install nginx"
          }
        },
        {
          name: "Apache",
          iconsrc: "/icons/apache.svg",
          install: {
            apt: "sudo apt install apache2 -y",
            choco: "choco install apache-httpd",
            homebrew: "brew install httpd"
          }
        }
      ]
    },
    {
      category: "Build Tools",
      tools: [
        {
          name: "CMake",
          iconsrc: "/icons/cmake.svg",
          install: {
            apt: "sudo apt install cmake -y",
            choco: "choco install cmake",
            homebrew: "brew install cmake"
          }
        },
        {
          name: "Maven",
          iconsrc: "/icons/maven.svg",
          install: {
            apt: "sudo apt install maven -y",
            choco: "choco install maven",
            homebrew: "brew install maven"
          }
        },
        {
          name: "Gradle",
          iconsrc: "/icons/gradle.svg",
          install: {
            apt: "sudo apt install gradle -y",
            choco: "choco install gradle",
            homebrew: "brew install gradle"
          }
        }
      ]
    },
    {
      category: "DevOps Tools",
      tools: [
        {
          name: "Ansible",
          iconsrc: "/icons/ansible.svg",
          install: {
            apt: "sudo apt install ansible -y",
            choco: "choco install ansible",
            homebrew: "brew install ansible"
          }
        },
        {
          name: "Terraform",
          iconsrc: "/icons/terraform.svg",
          install: {
            apt: "sudo apt install terraform -y",
            choco: "choco install terraform",
            homebrew: "brew install terraform"
          }
        },
        {
          name: "AWS CLI",
          iconsrc: "/icons/awscli.svg",
          install: {
            apt: "sudo apt install awscli -y",
            choco: "choco install awscli",
            homebrew: "brew install awscli"
          }
        },
        {
          name: "GitHub CLI",
          iconsrc: "/icons/github-cli.svg",
          install: {
            apt: "sudo apt install gh -y",
            choco: "choco install gh",
            homebrew: "brew install gh"
          }
        }
      ]
    },
    {
      category: "Game Engines",
      tools: [
        {
          name: "Unity",
          iconsrc: "/icons/unity.svg",
          install: {
            apt: "Refer to https://unity3d.com/get-unity/download for manual installation.",
            choco: "choco install unity",
            homebrew: "brew install --cask unity"
          }
        },
        {
          name: "Unreal Engine",
          iconsrc: "/icons/unreal.svg",
          install: {
            apt: "Refer to https://www.unrealengine.com/en-US/linux for instructions (manual build required).",
            choco: "choco install unrealengine",
            homebrew: "brew install --cask epic-games"
          }
        }
      ]
    }
    
  ];
export default toolsData;
