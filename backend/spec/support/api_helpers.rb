module ApiHelpers
    def json
        JSON.parse(response.body).deep_symbolize_keys
    end

    def json_data
        json[:data]
    end
end